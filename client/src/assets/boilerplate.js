const boilerplate = {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Document!</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Welcome to my page!</h1>
    <hr>
    <p>This is a boilerplate HTML file.</p>
    <script src="script.js"></script>
</body>
</html>`,
    css: `body {
    font-family: Arial, sans-serif;
    background-color: powderblue;
    margin: 0;
    padding: 20px;
}

h1 {
    color: green;
}`,
    js: `console.log('Hello from the boilerplate JavaScript file!');`,
};

export default boilerplate;
