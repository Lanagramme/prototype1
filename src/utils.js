import $ from 'jquery';
export const Render = (selector, component) => { 
  const el = $(selector);
  if (!el) return console.error('Selector not found:', selector);
  el.html(component.jsx);
  if (component.callback) component.callback();
}