import { Toast } from 'vant';

const components = [Toast]

export default {
  install: function (app: any) {
    components.forEach((component) => {
      app.use(component);
    })
  }
}