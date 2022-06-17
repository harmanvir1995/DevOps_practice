import React from 'react';
import TextFormatNumber from "../../components/TextFormatNumber";
import {render} from "@testing-library/react";


describe('Component TextFormatNumber', () => {
  it('displays correctly 10.5', () => {
    const number = 10.5;
    const res = render( <TextFormatNumber number={number} isPercentage={true} roundUp={true} /> );

    expect(res.queryByText("11 %")).toBeInTheDocument();
  });
  
  it('displays correctly 10.5', () => {
    const number = 10.5;
    const res = render( <TextFormatNumber number={number} isPercentage={false} roundUp={true} /> );

    expect(res.queryByText("11")).toBeInTheDocument();
  });
  
  it('displays correctly 10.5', () => {
    const number = 10.5;
    const res = render( <TextFormatNumber number={number} isPercentage={false} roundUp={false} /> );

    expect(res.queryByText("10.5")).toBeInTheDocument();
  });

  it('displays correctly 10.5', () => {
    const number = 10.5;
    const res = render( <TextFormatNumber number={number} isPercentage={true} roundUp={false} /> );

    expect(res.queryByText("10.5 %")).toBeInTheDocument();
  });
});
