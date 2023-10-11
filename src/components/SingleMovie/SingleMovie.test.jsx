import SingleMovie from "./SingleMovie";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { it, expect } from 'vitest';


it('should render singleMovie component with props', () => {
  const movie = {
    title: 'Movie Title',
    thumbnail: 'image-url.jpg',
    year: '2008'
   };

  render(
    <SingleMovie
      title={movie.title}
      thumbnail={movie.thumbnail}
      year={movie.year}
     />, { wrapper: BrowserRouter }
  );

  const title = screen.getByText('Movie Title');
  const image = screen.getByAltText('movie-img');
  const year = screen.getByText('2008')

  expect(title).toBeInTheDocument();
  expect(image).toBeInTheDocument();
  expect(year).toBeInTheDocument();
});


// it('should call handleViewFilm when image is clicked', async () => {
//   const handleViewFilm = vi.fn();
//   render(<SingleMovie handleViewFilm={handleViewFilm} />, { wrapper: BrowserRouter });
//   const image = screen.queryByAltText('movie-img');

//   await userEvent.click(image);
//   expect(handleViewFilm).toHaveBeenCalled();
// });

