# Product Administration

A dashboard built with **Next.js 16** and **Tailwind CSS v4** to manage products. This application allows for full CRUD operations with local persistence.

<br>

# Install Project

```bash
git clone https://github.com/CamrynBowWow/alt-coin-trader-assignment.git
cd alt-coin-trader-assignment
```

```bash
npm install
```

```bash
npm run dev
```

# Architecture

### Next.js 16

- For dynamic routing.
- Allowing the application to scale better.

### Tailwind CSS v4

- Custom utilities to keep the JSX clean.
- Have repetitive styles in the CSS file.

### TypeScript

- To define the Product shape in the project.
- Prevents errors during data transformation.

### UX & Error Handling

- There is a not found page if a URL is entered in and the product doesn't exist.
- Form validation for the create and edit which is on the client side.