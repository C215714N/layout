window.addEventListener('DOMContentLoaded', () => {
    const 
        d = document,
        root = d.getElementById('root'),
        words = ['-direction', 'space-', 'template-'],
        themes = ['flex','grid','position'],
        axis = ['justify', 'align'],
        attr = ['content', 'items'],
        wrap = ['wrap','nowrap','reverse'],
        color = [
            'primary',
            'secondary',
            'danger',
            'warning',
            'success', 
            'info',
            'grey',
            'dark',
            'light'
        ],
        direction = [
            'row',
            'row-reverse',
            'column',
            'column-reverse'
        ],
        content = [
            'start',
            'center',
            'end',
            'space-around',
            'space-between',
            'space-evenly'
        ],
        flexbox = {
            "flex-direction": direction,
            "justify-content": content,
            "align-items": ['stretch', ...content.slice(0,3)],
            wrap,
        },
        cssgrid = {
            "template-columns": [1,2,3,4,5,6],
            "template-rows": [1,2,3,4,5,6],
        },
    create = (element, attributes) => Object.assign(d.createElement(element), attributes),
    replace = (text, value = text) => { for(let w of words) { 
        if(text.includes(w)) value = text.replace(w,'') }
        return value;
    },
    fill = (parent, element, limit) => { for (let i = 0; i < limit; i++) { 
        parent.appendChild( create(element, { className: `br-2 p-4 text-light bg-${color[i]}`, innerHTML: `child ${i + 1}` } ) )
    } },
    filter = (array, word, value, type) => Array.from(array).filter(c => 
        !c.includes(replace(word))).join(',').replaceAll(',',' ') + ` d-${type} ` + replace(word + '-' + value),
    nest = (array) => { for(i = 1; i < array.length; i++){ 
        array[i-1].append(array[i]) 
    } },
    array = (obj, arr, values) => { arr[0].forEach(a => arr[1].forEach(b => combine(obj, a+'-'+b, values) ) ) },
    combine = (object, index, c) => object[index] = c,    
    form = (content, type) => { Object.keys(content).forEach( (key) => {
        const item = create('div', { className:'d-grid wrap-wrap g-1' }),
        select = create('select', { className: 'g-1 p-1',
            oninput: (e) => box.className = filter(box.classList, key, e.target.value, type)
        } )
        item.innerHTML+=`<label class="fs-10">${key.toUpperCase()}: </label>`
        content[key].forEach( prop => {
            const option = create('option',{ className:'p-1', innerHTML:prop } )
            nest([list, item, select, option])
        } )
    } ) },
    selection = (option, type) => {
        list.innerHTML = '';
        form(option, type);
    },
    section = create('section', { 
        className: 'd-flex wrap-wrap align-items-start justify-content-md-evenly g-1' 
    } ),
    box = create('div', { 
        className: 'col-24 col-md-18 min-w-5 o-auto br-2 b-1 b-solid border-light shadow-grey', 
        style: 'min-height: 320px; box-shadow: 0 0 .25rem var(--shadow)' 
    } ),
    list = create('form', { 
        className: 'd-grid g-2 m-0 p-0 col-24 col-md-5', 
        style: `grid-template-columns: repeat( auto-fit, minmax(min(100%, 280px), 1fr))` 
    } ),
    numbers = (ini, fin, arr=[]) => { for(let i = ini; i <= fin; i++) { arr[i] = i }; return arr }
    
    array(cssgrid, [["template"],["columns","rows"]], numbers(1,12))
    array(cssgrid, [axis, attr], [...content, 'stretch'])
    
    fill(box, 'div', 6)
    section.append(list)
    nest([root, section, box])
} )