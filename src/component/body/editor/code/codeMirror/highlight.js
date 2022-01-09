import CodeMirror from 'codemirror'

CodeMirror.defineSimpleMode('simplemode', {
  start: [
    { regex: /['"‘’“”](?:[^\\]|\\.)*?(?:['"‘’“”]|$)/, token: 'string' },
    {
      regex: /(function)(\s+)([a-z$][\w$]*)/,
      token: ['keyword', null, 'variable-2'],
    },
    {
      regex: /(?:function|var|return|if|for|while|else|do|this)\b/,
      token: 'keyword',
    },
    {
      regex: /如果|或者|否则|循环|直到|返回|退出|跳过/,
      token: 'keyword',
    },
    {
      regex: /([\u4e00-\u9fa5a-zA-Z￥]*[\w￥]*)([\(（])/,
      token: ['call', null, 'variable-2'],
    },

    { regex: /true|false|null|undefined/, token: 'atom' },
    {
      regex: /0x[a-f\d]+|[-]?(?:\.\d+|\d+\.?\d*)(?:e[-]?\d+)?/i,
      token: 'number',
    },

    { regex: /\/(?:[^\\]|\\.)*?\//, token: 'variable-3' },
    { regex: /\/\*/, token: 'comment', next: 'comment' },
    { regex: /[-+\/*=<>~《》]+/, token: 'operator' },
    { regex: /[\{\[\(]/, indent: true },
    { regex: /[\}\]\)]/, dedent: true },

    { regex: /[\u4e00-\u9fa5a-zA-Z￥][\w￥]*/, token: 'positive' },

    { regex: /!.*/, token: 'comment' },
    { regex: /<</, token: 'meta', mode: { spec: 'xml', end: />>/ } },
  ],
  comment: [
    { regex: /.*?\*\//, token: 'comment', next: 'start' },
    { regex: /.*/, token: 'comment' },
  ],
  meta: {
    dontIndentStates: ['comment'],
    lineComment: '//',
  },
})
