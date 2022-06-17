import React from 'react';
import NotFound from "../../components/NotFound";
import { render } from "@testing-library/react";
import TestRenderer from 'react-test-renderer';
import { BrowserRouter as Router } from "react-router-dom";

const testInstance = TestRenderer.create(<Router> <NotFound /></Router>).root;

describe('Component NotFound', () => {
  it('tests the text of the notFound page', () => {
    //Act
    const res = render(<Router> <NotFound /></Router>);
    //Assert
    expect(res.getByText('Oups ! Cette page n\'existe pas ...')).toBeInTheDocument();
    expect(res.getByText('Retour à l\'accueil')).toBeInTheDocument();
  });

  it('contains a link to the home page', () => {
    expect(testInstance.findAllByProps({ to: "/" }).length).toBe(3);
  });

});
