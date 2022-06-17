import React from 'react';
import TextFormatTime from "../../components/TextFormatTime";
import {render} from "@testing-library/react";



describe('Component TextFormatTime', () => {
  it('displays correctly 10.5 hours without rounding up', () => {
    const hours = 10.5;
    const res = render( <TextFormatTime hours={hours} roundUp={false} /> );

    expect(res.queryByText("10h 30m")).toBeInTheDocument();
  });
  
  it('displays correctly 10 hours without rounding up', () => {
    const hours = 10;
    const res = render( <TextFormatTime hours={hours} roundUp={false} /> );

    expect(res.queryByText("10h")).toBeInTheDocument();
  });

  it('displays correctly -10 hours without rounding up', () => {
    const hours = -10;
    const res = render( <TextFormatTime hours={hours} roundUp={false} /> );

    expect(res.queryByText("-10h")).toBeInTheDocument();
  });

  it('displays correctly 10.5 hours with rounding up', () => {
    const hours = 10.5;
    const res = render( <TextFormatTime hours={hours} roundUp={true} /> );

    expect(res.queryByText("11h")).toBeInTheDocument();
  });

  it('displays correctly 10 hours with rounding up', () => {
    const hours = 10;
    const res = render( <TextFormatTime hours={hours} roundUp={true} /> );

    expect(res.queryByText("10h")).toBeInTheDocument();
  });

  it('displays correctly -10.5 hours with rounding up', () => {
    const hours = -10.5;
    const res = render( <TextFormatTime hours={hours} roundUp={true} /> );

    expect(res.queryByText("-11h")).toBeInTheDocument();
  });

  it('displays correctly -10 hours with rounding up', () => {
    const hours = -10;
    const res = render( <TextFormatTime hours={hours} roundUp={true} /> );

    expect(res.queryByText("-10h")).toBeInTheDocument();
  });
});
