import { RoundsComponent } from "./rounds.state";
import { GameService } from "../../common/services/game.service";

export default {
  name: 'rounds',
  url: '/rounds?userOne&userTwo',
  component: RoundsComponent,
  resolve: [
    {
      token: 'users',
      deps: ['$transition$'],
      resolveFn: (trans) => {
        const gameService = new GameService();
        const params = trans.params();
        return gameService.getUser(params.userOne).then(userOne => {
          return gameService.getUser(params.userTwo).then(userTwo => {
            return [userOne, userTwo]
          });
        });
      }
    }
  ]
};