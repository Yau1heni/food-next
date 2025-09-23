'use client'; // Error boundaries must be Client Components

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html>
      <body>
        <h2>Что-то пошло не так!</h2>
        <p>Произошла глобальная ошибка</p>
        <button onClick={() => reset()}>Попробовать снова</button>
      </body>
    </html>
  );
}
