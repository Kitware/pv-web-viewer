import { Mutations } from 'paraview-glance/src/stores/types';

export default {
  state: {
    showDialog: false,
    currentScreenshot: null,
  },

  mutations: {
    OPEN_SCREENSHOT_DIALOG(state, screenshot) {
      state.currentScreenshot = screenshot;
      state.showDialog = true;
    },
    CLOSE_SCREENSHOT_DIALOG(state) {
      state.showDialog = false;
    },
  },

  actions: {
    TAKE_SCREENSHOT({ commit, rootState }, view) {
      if (view) {
        return view.captureImage().then((imgSrc) => {
          commit(Mutations.OPEN_SCREENSHOT_DIALOG, {
            imgSrc,
            viewName: view.getName(),
            viewData: rootState.views.viewData[view.getProxyId()],
          });
        });
      }
      return Promise.resolve();
    },
  },
};
