import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Index from '@/components/Index';
import About from '@/components/About';
import Contact from '@/components/Contact';
import News from '@/components/News';
import NewsDetail from '@/components/NewsDetail';
import Product from '@/components/Product';
import ProductDetail from '@/components/ProductDetail';
import Cart from '@/components/Cart';
import Register from '@/components/Register';
import Login from '@/components/Login';
import test from '@/test/test';

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {path: '/', component: Index},
    {path: '/about', component: About},
    {path: '/contact', component: Contact},
    {path: '/news', component: News},
    {path: '/newsDetail/:nid', component: NewsDetail},
    {path: '/product/:type', component: Product},
    {path: '/productDetail/:pid', component: ProductDetail},
    {path: '/cart', component: Cart},
    {path: '/register', component: Register},
    {path: '/login', component: Login},
    {path: '/test', component: test}
  ]
})
