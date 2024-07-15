import { Monster } from "../../App";
import "./card-list.styles.css";
import Card from "../card/card.component";

type CardProps = {
  monsters: Monster[];
}

// First argument is props
const CardList = ({ monsters }: CardProps) => (
  <div className="card-list">
    {monsters.map((monster) => {
      return <Card key={monster.id} monster={monster} />;
    })}
  </div>
);

/*
class CardList extends Component {
  render() {
    const { monsters } = this.props;

    return (
      <div className="card-list">
        {monsters.map((monster) => {
          return (
            <Card monster={monster} />
          );
        })}
      </div>
    );
  }
}
*/

export default CardList;
