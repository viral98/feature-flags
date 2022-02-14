
## FEATURE FLAGS
 
We use this system to define features that we can easily turn on and off, for testing or to put something temporarily on hold.
 
To define one, add it to the `defaults` object. The value must be a boolean.
 
Use it in TypeScript code:

```typescript
import features from "../features";

function foo() {
if (features.enabled("bar")) {
    doSomething();
}
}
```

Use it in TSX:
```typescript
<div>
{features.enabled("bar") && <Something />}
</div>
```

Use it in JavaScript code:
```javascript
import features from "../features";

function foo() {
if (features.bar)) {
    doSomething();
}
}
```

To set or unset them, open devtools, and:
```javascript
features.foo = true;
features.bar = false;
features.unset('piyo'); // resets to default
```
Then you have to reload the page or restart the app. Intentionally the values are not changed on the fly, to avoid bugs with IPC, React update headaches, etc.
 