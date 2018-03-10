module.exports = [
    {
        name: 'FLOAT_LITERAL',
        reg: /([ \*\/\-\+\=])(\d+\.\d+)/g
    },
    {
        name: 'INTEGRAL_LITERAL',
        reg: /([ \*\/\-\+\=]|^)(\d+)/g
    },
    {
        name: 'STRING_LITERAL',
        reg: /()(\"(\\\"|[^\"])*\")/g
    },
    {
        name: 'S_COMMENTS',
        reg: /()(\/\/.*\n?)/g
    },
    {
        name: 'M_COMMENTS',
        reg: /()(\/\*[^\*\/]*\*\/)/g
    },
    {
        name: 'A_CHAR',
        // we can allow \n chars 
        reg: /()(\'(\\.|[^\'])?\')/g
    },
];
