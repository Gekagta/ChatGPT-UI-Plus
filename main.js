//icons
const LaTeXIcon = 'M14.4207 5.63965H21.7007M2.29956 5.64014H9.57956M14.4207 15.3301H21.7007M14.4207 21.3896H21.7007M18.0894 9.27V2M2.29956 22L9.57956 14.73M9.57956 22L2.29956 14.73'
const SettingsIcon = 'M11.7 14C10.623 14 9.74999 13.1046 9.74999 12C9.74999 10.8954 10.623 10 11.7 10C12.7769 10 13.65 10.8954 13.65 12C13.65 12.5304 13.4445 13.0391 13.0789 13.4142C12.7132 13.7893 12.2172 14 11.7 14ZM16.8841 16.063V14.721C16.8841 14.3887 17.0128 14.07 17.2419 13.835L18.1672 12.886C18.6443 12.3967 18.6443 11.6033 18.1672 11.114L17.2419 10.165C17.0128 9.93001 16.8841 9.61131 16.8841 9.27899V7.93599C16.8841 7.24398 16.3371 6.68299 15.6624 6.68299H14.353C14.029 6.68299 13.7182 6.55097 13.4891 6.31599L12.5638 5.36699C12.0867 4.87767 11.3132 4.87767 10.8361 5.36699L9.91087 6.31599C9.68176 6.55097 9.37102 6.68299 9.04702 6.68299H7.73759C7.41341 6.68299 7.10253 6.81514 6.87339 7.05034C6.64425 7.28554 6.51566 7.6045 6.51592 7.93699V9.27899C6.51591 9.61131 6.3872 9.93001 6.15809 10.165L5.23282 11.114C4.75573 11.6033 4.75573 12.3967 5.23282 12.886L6.15809 13.835C6.3872 14.07 6.51591 14.3887 6.51592 14.721V16.063C6.51592 16.755 7.06288 17.316 7.73759 17.316H9.04702C9.37102 17.316 9.68176 17.448 9.91087 17.683L10.8361 18.632C11.3132 19.1213 12.0867 19.1213 12.5638 18.632L13.4891 17.683C13.7182 17.448 14.029 17.316 14.353 17.316H15.6614C15.9856 17.3163 16.2966 17.1844 16.5259 16.9493C16.7552 16.7143 16.8841 16.3955 16.8841 16.063Z'
const TableIcon = 'M4 9L20 9M8 9V20M6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V7.2C21 6.0799 21 5.51984 20.782 5.09202C20.5903 4.71569 20.2843 4.40973 19.908 4.21799C19.4802 4 18.9201 4 17.8 4H6.2C5.0799 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.07989 3 7.2V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20Z'
//needed vars!
var MessageCounts = -1;
var ConvertLatex = false;
var ConvertTable = false;
function Init(){
    // Load settings!
    LoadSettings()
    // Check if jQuery is already loaded
    if (typeof jQuery === 'undefined') {
        const jqueryScript = document.createElement('script');
        document.head.appendChild(jqueryScript);
        jqueryScript.src = chrome.runtime.getURL('jquery-3.6.0.min.js');
        jqueryScript.onload = () => {
            if (typeof MathQuill === 'undefined') {
                const script = document.createElement('script');
                document.head.appendChild(script);
                script.src = chrome.runtime.getURL('mathquill/mathquill.js');
                script.onload = () => {
                    AddButtons();
                };
            }
        };
    }
    AddButtons();
}

function AddButtons() {
    const toolbar = document.querySelector("#composer-background > div.flex.h-\\[44px\\].items-center.justify-between > div.flex.gap-x-1");
    // Add buttons only if they don't already exist
    const LatexExist = toolbar.querySelector('.latex-menu-button');
    const SettingsExist = toolbar.querySelector('.settings-menu-button');
    const TableExist = toolbar.querySelector('.table-menu-button');
    if (!LatexExist){
        // Create LaTeX builder button
        var div = toolbar.appendChild(document.createElement('div'));
        var _div = div.appendChild(document.createElement('div'));
        var span = _div.appendChild(document.createElement('span'));
        var button = span.appendChild(document.createElement('button'));
        
        button.classList.add('latex-menu-button', 'flex', 'h-8', 'min-w-8', 'items-center', 'justify-center', 'rounded-lg', 'p-1', 'text-xs', 'font-semibold', 'hover:bg-black/10', 'focus-visible:outline-black', 'dark:focus-visible:outline-white');
        button.setAttribute('aria-pressed', 'false');
        button.setAttribute('aria-label', 'LaTeX builder');
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // DONT SEND!
            event.preventDefault();
            ToggleLatexMenu(button);
        });

        var svg = button.appendChild(document.createElementNS('http://www.w3.org/2000/svg','svg'));
        svg.setAttribute('width', '24');
        svg.setAttribute('height', '24');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        var path = svg.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'path'));
        path.setAttribute('fill-rule', 'evenodd');
        path.setAttribute('clip-rule', 'evenodd');
        path.setAttribute('d', LaTeXIcon);
        path.setAttribute('stroke', '#FFF')
        path.setAttribute('stroke-width', '1.5');
        path.setAttribute('stroke-linejoin', 'round');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('fill', 'currentColor');
    }
    if (!TableExist){
        const div = toolbar.appendChild(document.createElement('div'));
        const _div = div.appendChild(document.createElement('div'));
        const span = _div.appendChild(document.createElement('span'));
        const button = span.appendChild(document.createElement('button'));

        button.classList.add('table-menu-button', 'flex', 'h-8', 'min-w-8', 'items-center', 'justify-center', 'rounded-lg', 'p-1', 'text-xs', 'font-semibold', 'hover:bg-black/10', 'focus-visible:outline-black', 'dark:focus-visible:outline-white');
        button.setAttribute('aria-pressed', 'false');
        button.setAttribute('aria-label', 'Create table');
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault();
            ToggleTableMenu(button);
        });

        const svg = button.appendChild(document.createElementNS('http://www.w3.org/2000/svg','svg'));
        svg.setAttribute('width', '24');
        svg.setAttribute('height', '24');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        const path = svg.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'path'));
        path.setAttribute('fill-rule', 'evenodd');
        path.setAttribute('clip-rule', 'evenodd');
        path.setAttribute('d', TableIcon);
        path.setAttribute('stroke', '#000000')
        path.setAttribute('stroke-width', '2');
        path.setAttribute('stroke-linejoin', 'round');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('fill', 'currentColor');
    }
    if (!SettingsExist){
        var div = toolbar.appendChild(document.createElement('div'));
        var _div = div.appendChild(document.createElement('div'));
        var span = _div.appendChild(document.createElement('span'));
        var button = span.appendChild(document.createElement('button'));

        button.classList.add('settings-menu-button', 'flex', 'h-8', 'min-w-8', 'items-center', 'justify-center', 'rounded-lg', 'p-1', 'text-xs', 'font-semibold', 'hover:bg-black/10', 'focus-visible:outline-black', 'dark:focus-visible:outline-white');
        button.setAttribute('aria-pressed', 'false');
        button.setAttribute('aria-label', 'Settings');
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // DONT SEND!
            event.preventDefault();
            ToggleSettingsMenu(button);
        });

        var svg = button.appendChild(document.createElementNS('http://www.w3.org/2000/svg','svg'));
        svg.setAttribute('width', '24');
        svg.setAttribute('height', '24');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        var path = svg.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'path'));
        path.setAttribute('fill-rule', 'evenodd');
        path.setAttribute('clip-rule', 'evenodd');
        path.setAttribute('d', SettingsIcon);
        path.setAttribute('stroke', '#000000')
        path.setAttribute('stroke-width', '1.5');
        path.setAttribute('stroke-linejoin', 'round');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('fill', 'currentColor');
    }
}

function ToggleLatexMenu(button) {
    let LatexMenu = document.querySelector('.latex-menu');
    if (!LatexMenu) {
        LatexMenu = CreateLatexMenu();
        document.body.appendChild(LatexMenu);
    }
    LatexMenu.style.display = LatexMenu.style.display === 'block' ? 'none' : 'block';
    // Position above the button!
    const rect = button.getBoundingClientRect();
    LatexMenu.style.left = `${rect.left - rect.left / 3}px`;
    LatexMenu.style.top = `${rect.top - LatexMenu.offsetHeight - 5}px`; 
}
function ToggleTableMenu(button) {
    let tableMenu = document.querySelector('.table-menu');
    if (!tableMenu) {
        tableMenu = CreateTableMenu();
        document.body.appendChild(tableMenu);
    }
    tableMenu.style.display = tableMenu.style.display === 'block' ? 'none' : 'block';

    const rect = button.getBoundingClientRect();
    tableMenu.style.left = `${rect.left - rect.left / 3}px`;
    tableMenu.style.top = `${rect.top - tableMenu.offsetHeight - 5}px`; 
}


function ToggleSettingsMenu(button) {
    let settingsMenu = document.querySelector('.settings-menu');
    if (!settingsMenu) {
        settingsMenu = CreateSettingsMenu();
        document.body.appendChild(settingsMenu);
        //update settings
        document.getElementById('convert-latex').checked = ConvertLatex;
        document.getElementById('convert-table').checked = ConvertTable;
    }
    settingsMenu.style.display = settingsMenu.style.display === 'block' ? 'none' : 'block';
    // Position above the button!
    const rect = button.getBoundingClientRect();
    settingsMenu.style.left = `${rect.left - rect.left / 4}px`;
    settingsMenu.style.top = `${rect.top - settingsMenu.offsetHeight - 5}px`; 
}


function CreateLatexMenu() {
    const menu = document.createElement('div');
    menu.classList.add('latex-menu');
    menu.style.position = 'absolute';
    menu.style.padding = '10px';
    menu.style.backgroundColor = 'rgba(50,50,50,0.85)';
    menu.style.color = 'rgb(255, 255, 255)';
    menu.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    menu.style.borderRadius = '8px';
    menu.style.display = 'none';
    menu.style.maxWidth = '500px'; 
    menu.style.wordWrap = 'break-word';

    // MathQuill styles
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = chrome.runtime.getURL('mathquill/mathquill.css');
    document.head.appendChild(style);

    // MathQuill input field
    const mathFieldDiv = document.createElement('div');
    mathFieldDiv.id = 'math-field'; 
    mathFieldDiv.style.width = '500px';  
    mathFieldDiv.style.maxWidth = '100%';
    mathFieldDiv.style.height = '110px';  
    mathFieldDiv.style.whiteSpace = 'normal';  
    mathFieldDiv.style.wordWrap = 'break-word'; 
    mathFieldDiv.style.overflowWrap = 'break-word';  
    mathFieldDiv.style.overflow = 'hidden';  
    mathFieldDiv.style.wordBreak = 'break-all';

    const latexOutput = document.createElement('pre');
    latexOutput.id = 'latex-output';  
    latexOutput.style.whiteSpace = 'normal'; 
    latexOutput.style.wordWrap = 'break-word'; 
    menu.appendChild(mathFieldDiv);
    menu.appendChild(latexOutput);

    // Copy button
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy';
    copyButton.style.marginTop = '10px';
    copyButton.onclick = () => {
        const textarea = document.createElement('textarea');
        textarea.value = latexOutput.textContent; 
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    };

    // Paste button
    const pasteButton = document.createElement('button');
    pasteButton.textContent = 'Paste';
    pasteButton.style.marginTop = '10px';
    pasteButton.style.marginLeft = '10px';
    pasteButton.onclick = () => {
        const editableDiv = document.querySelector('#prompt-textarea'); 
        if (editableDiv) {
            const latexCode = latexOutput.textContent;  
            const lastP = editableDiv.querySelector('p:not(.placeholder)'); 
            if (lastP) {
                lastP.innerHTML += latexCode;
            } else {
                const newP = document.createElement('p');
                newP.innerHTML = latexCode;  
                editableDiv.appendChild(newP);
            }
        };
    }
    const MQ = window.MathQuill.getInterface(2);
    const mathField = MQ.MathField(mathFieldDiv, {
        handlers: {
            edit: function() {
                const latex = mathField.latex();
                latexOutput.textContent = latex;  // update latex code after edit input field
            }
        },
        spaceBehavesLikeTab: false  
    });
    menu.appendChild(copyButton);
    menu.appendChild(pasteButton);

    // Close menu on click outside
    document.addEventListener('click', function (event) {
        if (!menu.contains(event.target)) {
            menu.style.display = 'none'; 
        }
    });

    return menu;
}
function CreateTableMenu() {
    const menu = document.createElement('div');
    menu.classList.add('table-menu');
    menu.style.position = 'absolute';
    menu.style.padding = '10px';
    menu.style.backgroundColor = 'rgba(50,50,50,0.85)';
    menu.style.color = 'rgb(255, 255, 255)';
    menu.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    menu.style.borderRadius = '8px';
    menu.style.display = 'none';
    menu.style.maxWidth = '600px';
    menu.style.overflowX = 'auto';

    const colsInput = document.createElement('input');
    colsInput.type = 'number';
    colsInput.placeholder = 'Header count';
    colsInput.style.marginBottom = '10px';
    colsInput.style.width = '100%';
    colsInput.style.backgroundColor = 'rgba(50,50,50,0.85)';
    colsInput.value = 3;

    const rowsInput = document.createElement('input');
    rowsInput.type = 'number';
    rowsInput.placeholder = 'Values count';
    rowsInput.style.marginBottom = '5px';
    rowsInput.style.width = '100%';
    rowsInput.style.backgroundColor = 'rgba(50,50,50,0.85)';
    rowsInput.value = 3;

    
    const tableContainer = document.createElement('div');
    tableContainer.style.marginTop = '10px';
    tableContainer.style.maxWidth = '100%';
    tableContainer.style.overflowX = 'auto';
    function updateTable() {
        tableContainer.innerHTML = '';
        const rows = parseInt(rowsInput.value) || 0;
        const cols = parseInt(colsInput.value) || 0;

        const headerRow = document.createElement('div');
        headerRow.style.display = 'flex';
        for (let c = 0; c < cols; c++) {
            const headerInput = document.createElement('input');
            headerInput.type = 'text';
            headerInput.classList.add('table-input');
            headerInput.placeholder = `Header ${c + 1}`;
            headerInput.style.marginRight = '5px';
            headerInput.style.width = '110px';
            headerInput.style.backgroundColor = 'rgba(50,50,50,0.85)';
            headerRow.appendChild(headerInput);
        }
        tableContainer.appendChild(headerRow);

        for (let r = 0; r < rows; r++) {
            const row = document.createElement('div');
            row.style.display = 'flex';
            for (let c = 0; c < cols; c++) {
                const cellInput = document.createElement('input');
                cellInput.type = 'text';
                cellInput.classList.add('table-input');
                cellInput.placeholder = `Value ${r + 1}-${c + 1}`;
                cellInput.style.marginRight = '5px';
                cellInput.style.width = '110px';
                cellInput.style.backgroundColor = 'rgba(50,50,50,0.85)';
                row.appendChild(cellInput);
            }
            tableContainer.appendChild(row);
        }
    }
    updateTable()
    // update after new value
    rowsInput.addEventListener('input', updateTable);
    colsInput.addEventListener('input', updateTable);

    const outputContainer = document.createElement('pre');
    outputContainer.classList.add('generated-table');
    outputContainer.style.marginTop = '10px';
    outputContainer.textContent = '\n\n\n\n\n\n\n'; 
    
    // transform form to text table
    const insertButton = document.createElement('button');
    insertButton.textContent = 'Generate table';
    insertButton.style.marginTop = '10px';
    insertButton.onclick = () => {
        const rows = parseInt(rowsInput.value);
        const cols = parseInt(colsInput.value);
        const inputs = tableContainer.querySelectorAll('input');

        let tableMarkdown = '';

        tableMarkdown += '| ';
        for (let c = 0; c < cols; c++) {
            const header = inputs[c].value || `Header ${c + 1}`;
            tableMarkdown += `${header} | `;
        }
        tableMarkdown += '\n';

        tableMarkdown += '| ' + '--- | '.repeat(cols) + '\n';

        for (let r = 0; r < rows; r++) {
            tableMarkdown += '| ';
            for (let c = 0; c < cols; c++) {
                const value = inputs[cols + r * cols + c].value || '';
                tableMarkdown += `${value} | `;
            }
            tableMarkdown += '\n';
        }

        outputContainer.textContent = tableMarkdown.trim(); 
    };



    menu.appendChild(colsInput);
    menu.appendChild(rowsInput);
    menu.appendChild(tableContainer);
    menu.appendChild(insertButton);
    menu.appendChild(outputContainer);
    document.addEventListener('click', function (event) {
        if (!menu.contains(event.target)) {
            menu.style.display = 'none'; 
        }
    });
    return menu;
}
function CreateSettingsMenu() {
    const menu = document.createElement('div');
    menu.classList.add('settings-menu');
    menu.style.position = 'absolute';
    menu.style.padding = '10px';
    menu.style.backgroundColor = 'rgba(50,50,50,0.85)';
    menu.style.color = 'rgb(255, 255, 255)';
    menu.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    menu.style.borderRadius = '8px';
    menu.style.display = 'none';
    menu.style.maxWidth = '500px'; 

    // Convert Table Switch
    const convertTableSwitch = document.createElement('div');
    convertTableSwitch.innerHTML = `
        <label for="convert-table">Format table in your message:</label>
        <input type="checkbox" id="convert-table" ${ConvertTable ? 'checked' : ''}>
    `;
    convertTableSwitch.querySelector('input').addEventListener('change', (e) => {
        ConvertTable = e.target.checked;
        SaveSettings();
    });

    // Convert LaTeX Switch
    const convertLatexSwitch = document.createElement('div');
    convertLatexSwitch.innerHTML = `
        <label for="convert-latex">Format LaTeX in your message:</label>
        <input type="checkbox" id="convert-latex" ${ConvertLatex ? 'checked' : ''}>
    `;
    convertLatexSwitch.querySelector('input').addEventListener('change', (e) => {
        ConvertLatex = e.target.checked;
        SaveSettings();
    });

    menu.appendChild(convertTableSwitch);
    menu.appendChild(convertLatexSwitch);

    // Close menu on click outside
    document.addEventListener('click', function (event) {
        if (!menu.contains(event.target)) {
            menu.style.display = 'none'; 
        }
    });

 
    return menu;
}
//util func
function SaveSettings() {
    chrome.storage.local.set({
        ConvertLatex: ConvertLatex,
        ConvertTable: ConvertTable
    });
}
function LoadSettings() {
    chrome.storage.local.get(['ConvertLatex', 'ConvertTable'], (result) => {
        if (result.ConvertLatex !== undefined) {
            ConvertLatex = result.ConvertLatex;
        }
        if (result.ConvertTable !== undefined) {
            ConvertTable = result.ConvertTable;
        }
    });
}

//converters
function ConvertTableInTextToFormattedTable(element) {
    const text = element.textContent.trim();
    const rows = text.split('\n');

    // find start of table
    const tableStartIndex = rows.findIndex(row => row.includes('|'));
    if (tableStartIndex === -1) return; // no table =(

    // find end of table
    const tableEndIndex = rows.findIndex((row, index) => index > tableStartIndex && !row.includes('|'));
    const tableRows = tableEndIndex === -1 ? rows.slice(tableStartIndex) : rows.slice(tableStartIndex, tableEndIndex);

    // remove dec
    const cleanedTableRows = tableRows.filter(row => !row.includes('---'));

    const tableData = cleanedTableRows.map(row => row.split('|')
        .map(cell => cell.trim()) // remove space from cells
        .filter(cell => cell !== '') // remove empty cells
    );

    // table html!
    let tableHTML = `
        <div class="markdown prose w-full break-words dark:prose-invert dark">
            <table>
                <thead>
                    <tr>
                        ${tableData[0].map(cell => `<th>${cell}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${tableData.slice(1).map(row => 
                        `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`
                    ).join('')}
                </tbody>
            </table>
        </div>
    `;
    var NeedSlice = false;
    if (rows.length > tableEndIndex && tableEndIndex != -1){
        NeedSlice = true;
    }
    // build text
    if (NeedSlice){
        const updatedText = [
            ...rows.slice(0, tableStartIndex), // text before table
            tableHTML, // formatted table!
        //  ...(isDuplicate ? [] : [rows[tableEndIndex]]), // remove duplicate row after the table if it's the same as the last table row
            ...rows.slice(tableEndIndex,tableEndIndex+1), // text after table
            ...rows.slice(tableEndIndex+1)
        ].join('\n');

        element.innerHTML = updatedText;
    }else{
        const updatedText = [
            ...rows.slice(0, tableStartIndex), // text before table
            tableHTML, // formatted table!
        ].join('\n');

        element.innerHTML = updatedText;
    }
}

function ConvertLatexInTextToFormattedLatex(messageElement) {
    const messageText = messageElement.innerHTML;
    const latexPattern = /(\\frac{[^}]+}{[^}]+}|\\[a-zA-Z]+{[^}]+}|\\[a-zA-Z]+)/g;
    const parts = messageText.split(latexPattern);
    messageElement.innerHTML = '';
    parts.forEach(part => {
        if (part.startsWith('\\')) {
            const latexSpan = document.createElement('span');
            latexSpan.classList.add('mathquill-rendered');
            messageElement.appendChild(latexSpan);

            try {
                const MQ = MathQuill.getInterface(2); //mq bro
                MQ.StaticMath(latexSpan).latex(part); 
            } catch (error) {
                console.error("Ошибка рендеринга LaTeX: ", error);
                latexSpan.textContent = part; 
            }
        } else {
            const textNode = document.createTextNode(part);
            messageElement.appendChild(textNode);
        }
    });
}
const OnUpdate = setInterval(() => {
    //init if needed
    const exist = document.querySelector("#composer-background > div.flex.h-\\[44px\\].items-center.justify-between > div.flex.gap-x-1 > div:nth-child(4)");
    const internet = document.querySelector("#composer-background > div.flex.h-\\[44px\\].items-center.justify-between > div.flex.gap-x-1 > div:nth-child(3)");
    if (internet && !exist) {
        MessageCounts = -1;
        Init();
    }
    //check for new message
    if (exist){
        _MessageCounts = document.querySelectorAll("div.whitespace-pre-wrap")
        if (MessageCounts == -1){
            if (_MessageCounts.length == 0){
                MessageCounts = 0;
            }else{
                MessageCounts = _MessageCounts.length
                _MessageCounts.forEach(message => {
                    console.log(message.innerHTML)
                    if (ConvertLatex){
                        ConvertLatexInTextToFormattedLatex(message);
                    }
                    if (ConvertTable){
                        ConvertTableInTextToFormattedTable(message);
                    }
                });
                
            }
        }
        if (MessageCounts+1 < _MessageCounts.length){
            //console.log('loaded other/old messages')
            MessageCounts = _MessageCounts.length
            _MessageCounts.forEach(message => {
                if (ConvertLatex){
                    ConvertLatexInTextToFormattedLatex(message);
                }
                if (ConvertTable){
                    ConvertTableInTextToFormattedTable(message);
                }
            });
        }
        if (MessageCounts < _MessageCounts.length){
            //console.log('new message')
            MessageCounts = _MessageCounts.length
            const lastMessage = _MessageCounts[_MessageCounts.length - 1];
            if (ConvertLatex){
                ConvertLatexInTextToFormattedLatex(lastMessage);
            }
            if (ConvertTable){
                ConvertTableInTextToFormattedTable(lastMessage);
            }
        }
    }
}, 500);
