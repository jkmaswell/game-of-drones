import { WinnerComponent } from './winner.state';

export default {
  name: 'winner',
  url: '/winner?name',
  component: WinnerComponent,
  resolve: [
    {
      token: 'winner',
      deps: ['$transition$'],
      resolveFn: (trans) => {
        const params = trans.params();
        return decodeURI(params.name);
      }
    }
  ]
};