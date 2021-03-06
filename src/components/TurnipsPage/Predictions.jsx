import React from 'react';
import { Table } from 'reactstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { analyze_possibilities } from '../../utils/predictions'; // eslint-disable-line

const Line = styled.tr`
  cursor: pointer;
  td {
    text-align: center;
  }
  ${(p) => p.selected && `
  background-color: #f0e8c0;
  `}
`;

const propTypes = {
  buyPrice: PropTypes.number.isRequired,
  sellPrices: PropTypes.arrayOf(PropTypes.number).isRequired,
  displayEstimate: PropTypes.func.isRequired,
  isFirstTime: PropTypes.bool,
  selectedLines: PropTypes.arrayOf(PropTypes.object),
};

const defaultProps = {
  selectedLines: [],
  isFirstTime: false,
};

const Predictions = ({
  buyPrice, sellPrices, displayEstimate, isFirstTime, selectedLines,
}) => {
  const onClick = (key, min, max) => {
    displayEstimate(key, min, max);
  };

  const renderPatterns = () => {
    const p = buyPrice === 0 ? NaN : buyPrice;
    const prices = [p, p, ...sellPrices];

    const isEmpty = prices.every((s) => !s);
    if (isEmpty) return null;

    const possibilities = analyze_possibilities(prices, isFirstTime, -1);
    return possibilities.map((poss) => {
      // for the additional graphs - we don't need the sunday price
      const { mins, maxs } = poss.prices.slice(2).reduce((acc, d) => ({
        mins: [...acc.mins, d.min],
        maxs: [...acc.maxs, d.max],
      }), { mins: [], maxs: [] });

      const days = poss.prices.slice(1);
      const key = `${poss.pattern_description.replace(/[" "]/g, '').toLowerCase()}_${days[0].min}_${days[0].max}`;
      const isSelected = selectedLines.findIndex((v) => v.key === key) !== -1;
      return (
        <Line onClick={() => onClick(key, mins, maxs)} key={key} selected={isSelected}>
          <td>{poss.pattern_description}</td>
          <td>{Number.isFinite(poss.probability) ? (`${(poss.probability * 100).toPrecision(3)}%`) : '--'}</td>
          {days.map((day) => <td key={shortid.generate()}>{day.min !== day.max ? `${day.min} to ${day.max}` : day.min}</td>)}
          <td>{poss.weekGuaranteedMinimum}</td>
          <td>{poss.weekMax}</td>
        </Line>
      );
    });
  };

  return (
    <>
      <h3>Predictions</h3>
      <Table size="sm" hover responsive>
        <thead>
          <tr>
            <th>Pattern</th>
            <th>%</th>
            <th>Sunday</th>
            <th colSpan="2">Monday</th>
            <th colSpan="2">Tuesday</th>
            <th colSpan="2">Wednesday</th>
            <th colSpan="2">Thursday</th>
            <th colSpan="2">Friday</th>
            <th colSpan="2">Saturday</th>
            <th>Guaranteed Min</th>
            <th>Potential Max</th>
          </tr>
        </thead>
        <tbody>{renderPatterns()}</tbody>
      </Table>
    </>
  );
};

Predictions.propTypes = propTypes;
Predictions.defaultProps = defaultProps;

export default Predictions;
