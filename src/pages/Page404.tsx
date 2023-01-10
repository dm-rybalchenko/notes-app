import { Link } from 'react-router-dom';


export default function Page404() {

  return (
    <div>
      <h1>Страница не существует</h1>
      <Link to="/notes">Перейти на главную</Link>
    </div>
  );
}
