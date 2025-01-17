const applyHighlighting = (text, activeTab) => {
    console.log(activeTab);
    if(activeTab && activeTab.endsWith('.html')){
    return applyHtmlHighlighting(text);   
    } 
    else if (activeTab && activeTab.endsWith('.css')){
        return applyCssHighlighting(text);
    }
    else {
        return text;
    }
    
};


const applyHtmlHighlighting = (text) => {
    // Step 1: Escape special characters
    const escapedText = text
    .replace(/&/g, '&amp;')  // Escape ampersands
    .replace(/</g, '&lt;')   // Escape less-than
    .replace(/>/g, '&gt;');  // Escape greater-than

    // Step 2: Wrap all tags (including self-closing tags) in <tag>...</tag>
    const withTags = escapedText.replace(
    /(&lt;\/?[a-z0-9-]+(?:\s+[^&gt;]*)?\/?&gt;)/gi,  // Matches both self-closing and non self-closing tags
    '<tag>$1</tag>'
    );

    // Step 3: Temporarily wrap strings in <string>...</string>
    const withStrings = withTags.replace(
    /("[^"]*"|'[^']*')/g,  // Strings in quotes
    '<string>$1</string>'
    );

    // Step 4: Wrap comments in <comment>...</comment>
    const withComments = withStrings.replace(
    /(&lt;!--[\s\S]*?--&gt;)/g,  // Matches HTML comments
    '<comment>$1</comment>'
    );

    // Step 5: Replace <tag>, <string>, and <comment> placeholders with <span> elements
    const highlightedText = withComments
    .replace(/<tag>/g, '<span class="tag">')
    .replace(/<\/tag>/g, '</span>')
    .replace(/<string>/g, '<span class="string">')
    .replace(/<\/string>/g, '</span>')
    .replace(/<comment>/g, '<span class="comment">')
    .replace(/<\/comment>/g, '</span>');

    return highlightedText;
}


const applyCssHighlighting = (text) => {
    // Step 1: Wrap comments in <comment>...</comment>
    const withComments = text.replace(
        /(\/\*[\s\S]*?\*\/)/g, // Matches CSS comments
        '<comment>$1</comment>'
    );

    // Step 2: Wrap selectors in <selector>...</selector>
    const withSelectors = withComments.replace(
        /^([^{]+)\{/gm, // Matches text before '{' (selectors)
        (match) => `<selector>${match}</selector>`
    );

    // Step 3: Wrap property names in <property>...</property>
    const withProperties = withSelectors.replace(
        /([\w-]+)\s*:/g, // Matches CSS properties (e.g., color, font-size)
        '<property>$1</property>:'
    );

    // Step 4: Wrap property values in <value>...</value>
    const withValues = withProperties.replace(
        /:\s*([^;]+)/g, // Matches CSS property values
        ': <value>$1</value>'
    );

    // Step 5: Highlight pseudo-classes and pseudo-elements
    const withPseudoClasses = withValues.replace(
        /(::?[a-z-]+)/g, // Matches pseudo-classes/elements (e.g., :hover, ::before)
        '<pseudo>$1</pseudo>'
    );

    // Step 6: Highlight at-rules (e.g., @media, @keyframes)
    const withAtRules = withPseudoClasses.replace(
        /(@[a-z-]+\s+)/g, // Matches at-rules
        '<atrule>$1</atrule>'
    );

    // Step 7: Replace the custom tags with styled <span> tags
    const highlightedText = withAtRules
        .replace(/<comment>/g, '<span class="css-comment">')
        .replace(/<\/comment>/g, '</span>')
        .replace(/<selector>/g, '<span class="css-selector">')
        .replace(/<\/selector>/g, '</span>')
        .replace(/<property>/g, '<span class="css-property">')
        .replace(/<\/property>/g, '</span>')
        .replace(/<value>/g, '<span class="css-value">')
        .replace(/<\/value>/g, '</span>')
        .replace(/<pseudo>/g, '<span class="css-pseudo">')
        .replace(/<\/pseudo>/g, '</span>')
        .replace(/<atrule>/g, '<span class="css-atrule">')
        .replace(/<\/atrule>/g, '</span>');

    return highlightedText;
};


export default applyHighlighting;