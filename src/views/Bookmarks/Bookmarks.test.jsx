import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Bookmarks from './Bookmarks';
import { BrowserRouter } from 'react-router-dom';


describe(Bookmarks, () => {
    it('should display header, footer and an empty favorites view', () => {
        render(<Bookmarks />, { wrapper: BrowserRouter });
        screen.debug();
        const headerTitle = screen.getByText('moviefind', { exact: false });
        expect(headerTitle).toBeInTheDocument();

        const footerText = screen.getByText('SUBSCRIBE TO OUR NEWSLETTER!');
        expect(footerText).toBeInTheDocument();

        const bookmarksTitle = screen.getByText('favorites:', { exact: false });
        expect(bookmarksTitle).toBeInTheDocument();

        const emptyFavorites = screen.queryByRole('booksmarks__grid');
        expect(emptyFavorites).not.toBeInTheDocument();

        screen.debug();
    });
    });