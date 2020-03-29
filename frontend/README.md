## Criando o módulo Frontend

### Para inicializar um projeto com react

```bash
npx create-react-app frontend
```

Para executar o projeto

```bash
npm start
```

## Notas

### Componente

Deve importar React e retornar uma função

```javascript
import React from 'react';

export default function Header(props) {
    return (
        <header>
            <h1>{props.title}</h1>
        </header>
    )
}
```

A função recebe um array de propriedades que são passadas para o componente tal qual uma propriedade de uma tag html

```javascript
<Header title="Be The Hero" />
```

Caso o componente seja utilizado com um conteúdo

```
<Header>Be The Hero</Header>
```

utilizamos `props.children` para pegar o valor.

### Estado e Imutabilidade

```javascript
import React, { useState } from 'react';
import Header from './Header';

function App() {

  const [counter, setCounter] = useState(0);

  function increment() {
    setCounter(counter + 1);
  }

  return (
    <div>
      <div>Contador: {counter}</div>
      <button onClick={increment}>Incrementar</button>
    </div>
  );
}

export default App;
```

### Instalar e utilizar ícones

```
npm install react-icons
```

Exemplo de font (Feather Icon)

```
import { FiLogIn } from 'react-icons/fi';
```

### Rotas

Para utilizar rotas devemos instalar o módulo `react-router-dom`

```
npm install react-router-dom
```

Exemplo router.js

```javascript
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Logon from './pages/Logon';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Logon} />
            </Switch>
        </BrowserRouter>
    )
}
```

### Criando link

```javascript
import { Link } from 'react-router-dom'
...

<Link to="/rota">
</Link>
```




# Visual Studio Code

## Ativar emmet

https://code.visualstudio.com/docs/editor/emmet  

CTRL + SHIFT + P  
Pesquisar por "settings" e selecionar "Preferences: Open Settings JSON"  

Incluir as opções
```javascript
    "emmet.syntaxProfiles": { "javascript" : "jsx" },
    "emmet.includeLanguages": { "javascript" : "javascriptreact" },
```