import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from "react-router-dom";

import Landing from './views/Landing/Landing';
import userEvent from "@testing-library/user-event";




describe('something truthy and falsy', () => {
  it('true to be true', () => {
    
    expect(true).toBe(true);
  });

  it('false to be false', () => {
    expect(false).toBe(false);
  });
});


// testar navigering till categorie view 

describe('App', () => {
  it('should navigate to categories view',async () => {
    render(<BrowserRouter>
    <Landing /></BrowserRouter>);

    const categoriesLink = await screen.getByTestId("categories")  // hämtar LI taggen ifrån navbar, där det ligger en onclick i

    await userEvent.click(categoriesLink);  // clickar på den li taggen 
    expect(await window.location.pathname).toBe("/movie-app/categories")   // kollar om url stämmer över categories menyn
    

  });
});