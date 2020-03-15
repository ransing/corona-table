import React from 'react';
import { Button } from '@storybook/react/demo';
import { action } from '@storybook/addon-actions';

export default { title: 'Button' };

export const withText = () => <Button>Hello Button</Button>;

export const withEmoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);
withEmoji.story = {
    parameters: {
      notes: 'A small component',
    },
  };