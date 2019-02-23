import { UIRouterReact, servicesPlugin, hashLocationPlugin } from '@uirouter/react';

// Module states
import home from './states/home/state';
import rounds from './states/rounds/state';
import winner from './states/winner/state';

const router = new UIRouterReact();
router.plugin(servicesPlugin);
router.plugin(hashLocationPlugin);

// Register each state
const states = [
  home,
  rounds,
  winner
];
states.forEach(state => router.stateRegistry.register(state));

router.urlService.rules.initial({ state: 'home' });
router.urlService.rules.otherwise({ state: 'home' });

export default router;