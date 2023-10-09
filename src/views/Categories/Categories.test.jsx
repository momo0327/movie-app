import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Categories from './Categories';
import { BrowserRouter } from 'react-router-dom';

describe(Categories, () => {
    it('should display header and footer', () => {
        render(<Categories />, { wrapper: BrowserRouter });
        screen.debug();
        const headerTitle = screen.getByText('moviefind', { exact: false });
        expect(headerTitle).toBeInTheDocument();
        const footerText = screen.getByText('SUBSCRIBE TO OUR NEWSLETTER!');
        expect(footerText).toBeInTheDocument();
        screen.debug();
    });
    });

describe(Categories, () => {
    it('should display title Categories and sub headers', () => {
        render(<Categories />, { wrapper: BrowserRouter });
        screen.debug();
        const categoriesTitle = screen.getByRole('header');
        expect(categoriesTitle).toBeInTheDocument(); 
        const subHeaders = screen.getAllByRole('categories__title');
        expect(subHeaders).toHaveLength(15);
        const moviesInCategories = screen.getAllByRole('movie-card');
        expect(moviesInCategories).toHaveLength(69);
        screen.debug();
    });
    });