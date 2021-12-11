import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";
import SearchBar from "../UI/SearchBar";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState();
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-ordering-app-21d93-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      const loadedMeals = [];
      if (props.category === "allitems") {
        if (searchString === "") {
          for (const key in responseData) {
            loadedMeals.push({
              id: key,
              name: responseData[key].name,
              description: responseData[key].description,
              price: responseData[key].price,
            });
          }
        } else {
          for (const key in responseData) {
            if (responseData[key].name.includes(searchString)) {
              loadedMeals.push({
                id: key,
                name: responseData[key].name,
                description: responseData[key].description,
                price: responseData[key].price,
              });
            }
          }
        }
      } else {
        if (searchString === "") {
          for (const key in responseData) {
            if (responseData[key].category === props.category) {
              loadedMeals.push({
                id: key,
                name: responseData[key].name,
                description: responseData[key].description,
                price: responseData[key].price,
              });
            }
          }
        } else {
          for (const key in responseData) {
            if (
              responseData[key].name.includes(searchString) &&
              responseData[key].category === props.category
            ) {
              loadedMeals.push({
                id: key,
                name: responseData[key].name,
                description: responseData[key].description,
                price: responseData[key].price,
              });
            }
          }
        }
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setErrorState(error.message);
    });
  }, [props.category, searchString]);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (errorState) {
    return (
      <section className={classes.MealsError}>
        <p>{errorState}</p>
      </section>
    );
  }

  const getStringHandler = (value) => {
    setSearchString(value);
  };

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <SearchBar getString={getStringHandler} />
        <hr />
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
