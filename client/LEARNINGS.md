### 1. While deploying the frontend on vercel, accessing `/about` endpoint was giving error on web page :

```bash
vercel 404: NOT_FOUND Code: NOT_FOUND
```

- Solved it by adding a `vercel.json` file and configuring the file. [ref](https://stackoverflow.com/a/75904914/17796286)

---

### 2. Unique key prop warnings in dev console :

```bash
Warning: Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.
    at ProjectList
```

- So sometimes this issue will still persist even if there are no List elements in the component or even when they're taken care of by giving a unique `key={}` prop into it.
- Now in the case of `components/ProjectList` component, the `map` method was return the empty react fragments like the following :

```javascript
return (
  <>
    <Link key={index}>......</Link>
  </>
);
```

- Here, putting key in `Link` is not sufficient as react fragments are getting returned so need to give unique key to it as well like the following :

```javascript
return (
  <React.Fragment key={index}>
    <Link key={index}>......</Link>
  </React.Fragment>
);
```

---

### 3. Lookout for warnings like `<div> cannot appear as descendent of <p>`.

---

### 4. Warning -

```javascript
react-dom.development.js:86 Warning:
Received the string `true` for the boolean attribute `required`.
Although this works, it will not work as expected if you pass the string "false".
Did you mean required={true}?
```

But then dont even use true as 'Value must be omitted for boolean attributes' so just use `required`.

---

### 5. For the eslist warning of `A form label must be associated with a control.` :

```javascript
<label htmlFor="title" className="block text-gray-700 stext-sm font-bold mb-2">
  Project Title
  <input type="text" id="title" placeholder="Enter Project title" />
</label>
```

Put `<input>` inside `<label>` and also add `htmlFor` attribute with matching `id`.

---

### 6. ESLint warnings :

```javascript
Avoid non-native interactive elements. If using native HTML is not possible, add an appropriate role and support for tabbing, mouse, keyboard, and touch inputs to an interactive content element.

Visible, non-interactive elements with click handlers must have at least one keyboard listener.eslintjsx-a11y/click-events-have-key-events
```

For this code :

```javascript
        <div
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
        >
```

So added the following and got rid of the 1st warning

```javascript
role="button"
tabIndex={0}
```

Then added on `onKeyDown` method like :

```javascript
        <div
          role="button"
          tabIndex={0}
        //   onClick={handleClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleClick();
            }
          }}
          style={{ cursor: 'pointer' }}
        >

```

---

### 7. ESLint warning :

```javascript
The object passed as the value prop to the Context provider changes every render. To fix this consider wrapping it in a useMemo hook.
```

So wrapped it in a `useMemo` hook :

```javascript
const contextValue = useMemo(() => ({ userData, setUserData }), [userData]);

return (
  <StepperContext.Provider value={contextValue}>
    {children}
  </StepperContext.Provider>
);
```

---

### 8. ESLint warning :

```javascript
Visible, non-interactive elements with click handlers must have at least one keyboard listener.
eslint
(jsx-a11y/click-events-have-key-events)
```

- The error message you're seeing is an ESLint (a popular JavaScript linter) error related to accessibility (`a11y`) best practices.
- The purpose of this rule is to ensure that interactive elements on a web page are accessible to users who might not be able to use a mouse or other pointing devices. By adding keyboard event listeners, you allow users who navigate your website using a keyboard or assistive technologies to interact with the element as well.
- To fix this issue, you can add a keyboard event listener to the `<li>` element that corresponds to the click handler you have already defined. This way, users will be able to interact with the element both via mouse clicks and keyboard actions.

```javascript
                <li
                  key={index}
                  onClick={() => setMobileNav(!mobileNav)}
                  onKeyPress={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      setMobileNav(!mobileNav);
                    }
                  }}
                >
```

- The fix over the `<li>` was followed by the following warning :

```javascript
Non-interactive elements should not be assigned mouse or keyboard event listeners.
eslintjsx-a11y/
(no-noninteractive-element-interactions)
```

- So attach the event listener to an interactive element instead of the non-interactive `<li>` element. So did the following :

```javascript
<li key={index}>
  <Link
    to={navigation.path}
    className="mobile-item"
    onClick={() => setMobileNav(!mobileNav)}
    onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === " ") {
        setMobileNav(!mobileNav);
      }
    }}
  >
    {navigation.name}
  </Link>
</li>
```

---

### 9. Vercel deployment error :

- Go to your application in vercel --> Deployments tab --> Latest deployment listed with red dot error --> Click the 3 dots `...` in its corner and 'Inpect deployment' --> And you'll get the following 'Building' log :

```bash
Running "vercel build"

Vercel CLI 31.1.1

Detected `pnpm-lock.yaml` version 6 generated by pnpm 8...

Installing dependencies...

 ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with package.json

Note that in CI environments this setting is true by default. If you still need to run install in such cases, use "pnpm install --no-frozen-lockfile"

    Failure reason:
    specifiers in the lockfile ({"react":"^18.2.0","react-dom":"^18.2.0","react-hook-form":"^7.45.2","react-icons":"^4.10.1","react-router-dom":"^6.14.1","@types/react":"^18.2.14","@types/react-dom":"^18.2.6","@vitejs/plugin-react":"^4.0.1","autoprefixer":"^10.4.14","daisyui":"^3.2.1","eslint":"^8.44.0","eslint-config-airbnb":"^19.0.4","eslint-plugin-import":"^2.27.5","eslint-plugin-jsx-a11y":"^6.7.1","eslint-plugin-react":"^7.32.2","eslint-plugin-react-hooks":"^4.6.0","eslint-plugin-react-refresh":"^0.4.1","postcss":"^8.4.25","tailwind-scrollbar":"^3.0.4","tailwindcss":"^3.3.2","vite":"^4.4.0"}) don't match specs in package.json ({"@types/react":"^18.2.14","@types/react-dom":"^18.2.6","@vitejs/plugin-react":"^4.0.1","autoprefixer":"^10.4.14","daisyui":"^3.2.1","eslint":"^8.44.0","eslint-config-airbnb":"^19.0.4","eslint-plugin-import":"^2.27.5","eslint-plugin-jsx-a11y":"^6.7.1","eslint-plugin-react":"^7.32.2","eslint-plugin-react-hooks":"^4.6.0","eslint-plugin-react-refresh":"^0.4.1","postcss":"^8.4.25","tailwind-scrollbar":"^3.0.4","tailwindcss":"^3.3.2","vite":"^4.4.0","react":"^18.2.0","react-dom":"^18.2.0","react-hook-form":"^7.45.2","react-icons":"^4.10.1","react-router-dom":"^6.14.1","tw-elements":"^1.0.0-beta2"})
Error: Command "pnpm install" exited with 1
```

- Now look carefully at these 2 lines :

```bash
 ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with package.json

Note that in CI environments this setting is true by default. If you still need to run install in such cases, use "pnpm install --no-frozen-lockfile"
```

- As instructed in the 2nd line, use the command `pnpm install --no-frozen-lockfile` for deployment.

```bash
pnpm install --no-frozen-lockfile
```

- So go to the project settings in vercel --> General --> Install Command --> Override --> Paste this command.
- The error occered on the "vercel build" stage but the error log suggested us an `install` command so override the 'Install Command' in settings and not the 'Build Command'.

---

### 10. `.env` setup :

- We are using Vite instead of `create-react-app` package.
- So we cant use `process.env` out of the box with the envirnment variables prefix 'REACT_APP'.
- Therefore, Vite has its own way of handing `.env` file's variables.
- Use `import.meta.env` instead of `process.env`.
- ANd use prefix `VITE_` like 'VITE_API_URL' in the `.env` file.

---

### 11. Image upload from React :

1. Our backend accepts the image through `req.files` object.
2. So added this property `{photo: null}` in the initialState of formData as the backend accepts image file as `photo` keyword in the request body.
3. Access the file from HTML input tag using `event.target.files[0]` property and update the state variable using `setFormData`.
4. Create a form object using `FormData` class and append the required fields which needs to be sent with the request.
5. Do not set any headers of `Content-Type` as when working with multipart/form-data, the browser automatically sets the appropriate Content-Type header, so you don't need to manually set it.
   1. Including the header manually might cause issues, especially with CORS.

---

### 12. Dealing with skills input

1. The input for developer skills is taken as a plain string from input element.
2. But we need to send it in an array form.
3. Each skill needs to be an array element.
4. So convert the input string value from `formData.skills` using `split(", )` method.
5. Then a challenge of sending this array through content-type: form-data will arise.
6. So iterate over that array using `forEach` and append each skill separately on the bodyData object .

```js
if (formData.skills) {
  // converting input string to array
  const skillsArray = formData.skills.split(", ");
  // appending each array element to a separate form-data key as sending array in form-data type is tricky
  skillsArray.forEach((skill) => {
    bodyData.append("skills", skill);
  });
}
```

### 13. Conditional rendering 

- Always do conditional rendering inside `return` method of a component.
- Something like this :
```js
return (
  (!isObjectEmpty(org_data)) ? (
    <div className="flex flex-col max-w-screen-sm md:max-w-none lg:max-w-none items-center justify-center mx-3">
      {/* ... Rest of your JSX ... */}
    </div>
  ) : (
    <div className="flex w-full py-10 justify-center text-slate-500">
      <img alt="loader" src={loading} />
    </div>
  )
);
```

---

### 14. Issues at profile pages 

1. Even though the application was completely finished still it gave errors in fetching some proposals, reviews at developer, company profile pages.
2. It happened because those proposals, reviews were posted from a dummy developer account which I later deleted from database.
3. So when the API was trying to fetch those results which had data from that deleted developer too, it was throwing error as mongoose at the back couldn't resolve the populate query for that _id as it doesn't exists anymore.