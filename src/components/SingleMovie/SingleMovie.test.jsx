import SingleMovie from "./SingleMovie";
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from 'react-router-dom';


it('should render singleMovie component with props', () => {
  const movie = {
    title: 'Movie Title',
    thumbnail: 'image-url.jpg',
   };

  render(
    <SingleMovie
      title={movie.title}
      thumbnail={movie.thumbnail}
     />, { wrapper: BrowserRouter }
  );

  const title = screen.queryByText('Movie Title');
  const image = screen.queryByAltText('movie-img');

  expect(title).toBeInTheDocument();
  expect(image).toBeInTheDocument();
});


// it('should call handleViewFilm when image is clicked', async () => {
//   const handleViewFilm = vi.fn();
//   render(<SingleMovie handleViewFilm={handleViewFilm} />, { wrapper: BrowserRouter });
//   const image = screen.queryByAltText('movie-img');

//   await userEvent.click(image);
//   expect(handleViewFilm).toHaveBeenCalled();
// });

