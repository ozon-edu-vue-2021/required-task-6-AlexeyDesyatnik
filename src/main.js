import Vue from 'vue';
import App from './App.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSort,
  faSortAlphaDown,
  faSortAlphaDownAlt,
  faFilter,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VTooltipPlugin from 'v-tooltip';
import 'v-tooltip/dist/v-tooltip.css';
import { Directive } from '@/directives/detect-viewport';

Vue.use(VTooltipPlugin);

library.add(faSort, faSortAlphaDown, faSortAlphaDownAlt, faFilter, faTimes);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.directive('detect-viewport', Directive);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
