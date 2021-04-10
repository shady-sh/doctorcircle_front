import { withRouter } from "react-router-dom";

const mainMenuitems = [
  "Welcome",
  "Speakers",
  "Program",
  "LIVE",
  "Abstracts",
  "E-Booth",
];

const MainMenuList = ({ history }) => {
  return (
    <div className="menuList">
      {mainMenuitems.map((v, i) => {
        return (
          <a
            href=""
            key={i}
            onClick={(e) => {
              e.preventDefault();
              history.push(`/${v}`);
            }}
          >
            {v}
          </a>
        );
      })}
    </div>
  );
};

export default withRouter(MainMenuList);
