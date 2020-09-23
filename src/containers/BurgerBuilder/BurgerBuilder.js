import React, { useState, useEffect } from "react";
import Aux from "../../hoc/Auxx/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const BurgerBuilder = (props) => {
  useEffect(() => {
    props.onInitIngredients();
  }, []);
  const [purchasing, setPurchasing] = useState(false);
  const [loading, setLoading] = useState(false);

  const purchaseHandler = () => {
    setPurchasing(true);
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  // const addIngredientHandler = (type) => {
  //   const oldCount = ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   setIngredients(updatedIngredients);
  //   const priceAddition = ING_PRICES[type];
  //   const newPrice = price + priceAddition;
  //   setPrice(newPrice);
  //   updatePurchasable(updatedIngredients);
  // };

  // const removeIngredientHandler = (type) => {
  //   const oldCount = ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   setIngredients(updatedIngredients);
  //   const priceAddition = ING_PRICES[type];
  //   const newPrice = price - priceAddition;
  //   setPrice(newPrice);
  //   updatePurchasable(updatedIngredients);
  // };
  const purchaseContinuelHandler = () => {
    props.onInitPurchase();
    props.history.push("/checkout");
  };
  const updatePurchasable = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const disabledInfo = {
    ...props.ings,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;

  let burger = props.error ? (
    <p>Ingredients can't be loaded</p>
  ) : (
    <Spinner></Spinner>
  );

  if (props.ings != null) {
    burger = (
      <Aux>
        <Burger ingredients={props.ings} />
        <BuildControls
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          disabled={disabledInfo}
          price={props.price}
          purchasable={updatePurchasable(props.ings)}
          ordered={purchaseHandler}
        ></BuildControls>
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingredients={props.ings}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinuelHandler}
      ></OrderSummary>
    );
  }
  if (loading) {
    orderSummary = <Spinner></Spinner>;
  }
  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
