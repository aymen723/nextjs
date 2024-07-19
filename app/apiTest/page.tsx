"use client";
import {
  fetchPharmaciesByFilter,
  fetchPharmacyById,
} from "@/client/api/stockService/pharmacyApi";
import {
  fetchProductById,
  fetchProductsByFilter,
} from "@/client/api/stockService/productApi";
import {
  fetchStockByFilter,
  fetchStockById,
} from "@/client/api/stockService/stockApi";
import {
  fetchTagById,
  fetchTagsByFilter,
} from "@/client/api/stockService/tagApi";
import React from "react";

type Props = {};

const ApiTest = (props: Props) => {
  return <div>ApiTest</div>;
};

export default ApiTest;
