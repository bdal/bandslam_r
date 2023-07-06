## rendering
2 reasons for  a component to render:
- It’s the component’s initial render.
- The component’s (or one of its ancestors’) state has been updated.

## propTypes: to enforce requirements

> onUpload: PropTypes.func.isRequired,

# hooks
Two rules of hooks
- "Only Call Hooks at the Top Level" — Don't call hooks from inside loops, conditions, or nested statements so that the hooks are called in the same order each render.
- "Only Call Hooks from React Functions" — Don't call hooks from plain JavaScript functions so that stateful logic stays with the component.

## useEffect
- a hook

lets you synchronize a component with an external system

## useRef
- a hook

When you want a component to “remember” some information, but you don’t want that information to trigger new renders, you can use a ref. 

Inside your component, call the useRef Hook and pass the initial value that you want to reference as the only argument. For example, here is a ref to the value 0:
> const ref = useRef(0);

useRef returns an object like this:
> { 
  current: 0 // The value you passed to useRef
}

# Library

## Mui

## Formik

# How to add data from multiple child components