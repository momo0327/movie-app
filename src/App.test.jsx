import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from "react-router-dom";

import Landing from './views/Landing/Landing';
import userEvent from "@testing-library/user-event";
import SingleMovie from './components/SingleMovie/SingleMovie';




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

// testar navigering från categories till film-view
describe('App', () => {
  it('should click on a movie and check the url film-view',async () => {
    render(<BrowserRouter>
    <SingleMovie /></BrowserRouter>);

    const singleMovieClick = await screen.getByTestId("SingleMovie")  // hämtar img taggen ifrån singlemovie, där det ligger en onclick i

    await userEvent.click(singleMovieClick);  // clickar på den img taggen, eftersom att användaren kommer att klicka på bilen för att komma till film-view
    expect(await window.location.pathname).toBe("/movie-app/film-view")   // kollar om url stämmer över film-view
    

  });
});