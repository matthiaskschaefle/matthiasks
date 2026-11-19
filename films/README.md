# Estúdio de filmes dos cases

`npm run film -- <nome>` lê `films/<nome>/film.json` e gera, em `public/media/`:
`<nome>-film.mp4`, a legenda `<nome>-film.en.vtt` (tirada do roteiro) e `<nome>-film-poster.jpg`.

Precisa do Edge (Windows) ou do Chrome. O ffmpeg vem pelo pacote `ffmpeg-static`.
Para usar outro navegador ou outro ffmpeg: variáveis `BROWSER` e `FFMPEG`.

## Tipos de cena

- `statement`: frase grande, com eyebrow, logo e linha de apoio opcionais.
- `shot`: texto à esquerda e um print em moldura de navegador (`url`) ou de celular (`"frame": "phone"`).
- `numbers`: até quatro números que contam uma vez.
- `end`: logo e frase final.
- `demo`: o produto em uso. Abre `url`, e um cursor desenhado segue os `steps`:
  - `{ "move": "<seletor>" }`, `{ "click": "<seletor>" }`, `{ "type": "<seletor>", "text": "..." }`
  - `{ "scroll": 400 }`, `{ "key": "Escape" }`
  - `{ "note": "<seletor>", "text": "...", "side": "right | left | below" }` desenha anel, seta e nota
  - `{ "clearNotes": true }` apaga as notas
  - `seconds` muda a velocidade do cursor, e `hold` segura a tela depois do passo.

Os seletores são os do Playwright (`button:has-text("Salvar")`, `.c-job >> nth=0`).
Cada cena aceita `dark`, `duration` (exceto demo) e `caption` (texto da legenda).

## Opções

- `--stills`: só quadros de conferência em `films/<nome>/.work/`, sem vídeo.
- `--scene 3`: refaz só uma cena que não seja demo, e não monta o filme.

## Mappe

As cenas demo filmam o Mappe em modo local, com dados de demonstração e empresas inventadas.
Nunca filme as candidaturas reais.

1. Copie o repositório do Mappe para uma pasta temporária.
2. Troque `src/data/seed/applications.json` e `src/data/seed/jobs.json` pelos arquivos de `films/mappe/demo-data/`.
3. Rode `npx vite --port 5175` nessa cópia, sem as variáveis do Supabase.
4. Rode `npm run film -- mappe` aqui.
