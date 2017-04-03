import {environment} from '../../../environments/environment';

let suff = 'api/';

if (environment.production) {
  suff = '';
}

export default suff;
