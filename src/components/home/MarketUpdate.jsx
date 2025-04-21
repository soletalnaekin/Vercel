"use client";

import CategoryNav from "@/components/CategoryNav";
import Button from "@/components/Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const majors = ["BTC", "ETH", "LTC", "BNB", "TRX", "XRP", "NEO", "QTUM"];

export default function MarketUpdate() {
  const [currencies, setCurrencies] = useState({});

  useEffect(() => {
    fetch(`/api/currency?symbol=${majors.join(",")}`)
      .then((response) => response.json())
      .then((response) => setCurrencies(response.data));
  }, []);

  console.log(currencies);

  if (Object.keys(currencies).length)
    return (
      <>
        <CategoryNav />
        <table className="table table-hover">
          <thead>
            <tr>
              <th></th>
              <th className="text-secondary">#</th>
              <th className="text-secondary" style={{ width: "20rem" }}>
                Name
              </th>
              <th className="text-secondary">Last Price</th>
              <th className="text-secondary">24h %</th>
              <th className="text-secondary">Market Cap</th>
              <th className="text-secondary">Last 7 Days</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {majors.map((symbol, index) => (
              <tr key={index}>
                <td>
                  <i
                    className="fa-regular fa-star"
                    onClick={(event) => {
                      event.target.classList.toggle("fa-regular");
                      event.target.classList.toggle("fa-solid");
                    }}
                    aria-hidden={true} //* Required for hydration, it fails when Font Awesome tries to add 'aria-hidden' attribute.
                  ></i>
                </td>
                <td>{index + 1}</td>
                <td>
                  <div className="d-inline me-2">
                    <Image
                      src={`https://raw.githubusercontent.com/reddavis/Crypto-Icons-API/refs/heads/master/public/svg/icon/${symbol.toLowerCase()}.svg`}
                      alt="Logo"
                      width={24}
                      height={24}
                    />
                  </div>
                  {currencies[symbol].name} |{" "}
                  <span className="text-secondary">{symbol}</span>
                </td>
                <td>
                  ${currencies[symbol].quote.USDT.price.toLocaleString("en-US")}
                </td>
                <td
                  className={`text-${
                    currencies[symbol].quote.USDT.percent_change_24h >= 0
                      ? "success"
                      : "danger"
                  }`}
                >
                  {currencies[symbol].quote.USDT.percent_change_24h >= 0
                    ? "+"
                    : ""}
                  {(
                    currencies[symbol].quote.USDT.percent_change_24h + 0.0
                  ).toFixed(2)}
                  %
                </td>
                <td>
                  $
                  {currencies[symbol].quote.USDT.market_cap.toLocaleString(
                    "en-US"
                  )}
                </td>
                <td>
                  <Image
                    src={`/TEST_graph${
                      currencies[symbol].quote.USDT.percent_change_24h >= 0
                        ? ""
                        : "2"
                    }.png`}
                    alt="Graph"
                    width={172}
                    height={72}
                  />
                </td>
                <td>
                  <Button className="bg-white border-secondary-subtle py-1 px-3 border-2">
                    <Link
                      className="text-black text-decoration-none"
                      href="/buy-crypto"
                    >
                      Trade
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
}
