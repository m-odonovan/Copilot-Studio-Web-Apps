import { hooks } from 'botframework-webchat';

const { useActivities } = hooks;

export default function useLastBotActivity() {
  const [activities] = useActivities();
  console.log('activities.length');
//console.log([activities].length());
  return [
    activities
      .slice()
      .reverse()
      .find(({ from: { role }, type }) => role === 'bot' && type === 'message')
  ];
}
