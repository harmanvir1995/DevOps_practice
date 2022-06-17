import React from 'react';
import TestRenderer from 'react-test-renderer';
import ReactDOM from 'react-dom'
import { Provider as ProjectProvider } from "../../context/ProjectContext";
import { fireEvent, act, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Loader from '../../components/Loader';


const testInstance = TestRenderer.create(<Loader />).root;

describe('The DrawerMenu component', () => {
  it('contains loader', () => {
    let res = render(<Loader />);
    
    expect(res.getByText('Loading...')).toBeInTheDocument();
  });

});