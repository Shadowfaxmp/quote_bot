import 'dotenv/config';
import express from 'express';
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware, MessageComponentTypes, ButtonStyleTypes,
} from 'discord-interactions';
import {getRandomQuote} from './quotes.js';

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;

const interactions = new Map();

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */
app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
  // Interaction type and data
  const {type, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    // "test" command
    if (name === 'quote_challenge') {
      const interactionId = req.body.id;
      const randomQuote = getRandomQuote();
      // Store the correct answer for this interaction
      interactions.set(interactionId, randomQuote.author);

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Guess the author of this quote: \n*"${randomQuote.quote}"*`,
          components: [
            {
              type: MessageComponentTypes.ACTION_ROW,
              components: [
                {
                  type: MessageComponentTypes.BUTTON,
                  custom_id: `answer_technoblade_${interactionId}`,
                  label: 'Technoblade',
                  style: ButtonStyleTypes.PRIMARY,
                },
                {
                  type: MessageComponentTypes.BUTTON,
                  custom_id: `answer_sun_tzu_${interactionId}`,
                  label: 'Sun Tzu',
                  style: ButtonStyleTypes.PRIMARY,
                },
              ],
            },
          ],
        },
      });
    }

    console.error(`unknown command: ${name}`);
    return res.status(400).json({ error: 'unknown command' });
  }

  if (type === InteractionType.MESSAGE_COMPONENT) {
    const componentId = req.body.data.custom_id;

    // Extract the interaction ID from the button's custom_id
    const interactionId = componentId.split('_').pop();
    const quote_author = interactions.get(interactionId);

    if (!quote_author) {
      console.error(`No data found for interaction ID: ${interactionId}`);
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: { content: 'Something went wrong. Please try again!' },
      });
    }

    // Check the answer
    const correctAnswer = interactions.get(interactionId);
    const userGuess = componentId.includes('technoblade') ? 'Technoblade' : 'Sun Tzu';
    const user = req.body.member?.user || req.body.user;

    console.log(JSON.stringify(req.body, null, 2));
    const responseMessage =
        userGuess === correctAnswer
            ? `Good job ${user.username}! ${correctAnswer} is indeed the right answer!`
            : `Oops! The correct answer was ${correctAnswer}.`;

    // Respond to the user
    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: responseMessage },
    });

    // Clean up the interaction data
    interactions.delete(interactionId);
  }


});
app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
