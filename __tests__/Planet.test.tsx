import Planet from '../src/components/Planet';
import { render, screen } from '@testing-library/react';

describe('Planet component', () => {
  const props = {
    name: 'Tatooine',
    climate: 'arid',
    terrain: 'desert',
    population: '200000',
    diameter: '10465',
    gravity: '1 standard',
  };

  it('renders planet details', () => {
    render(<Planet {...props} />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      props.name
    );
    const climateParagraph = screen.getByText('Climate:', {
      selector: 'span',
    }).parentElement;
    expect(climateParagraph).toHaveTextContent(`Climate: ${props.climate}`);

    const terrainParagraph = screen.getByText('Terrain:', {
      selector: 'span',
    }).parentElement;
    expect(terrainParagraph).toHaveTextContent(`Terrain: ${props.terrain}`);

    const populationParagraph = screen.getByText('Population:', {
      selector: 'span',
    }).parentElement;
    expect(populationParagraph).toHaveTextContent(
      `Population: ${props.population}`
    );

    const diameterParagraph = screen.getByText('Diameter:', {
      selector: 'span',
    }).parentElement;
    expect(diameterParagraph).toHaveTextContent(
      `Diameter: ${props.diameter} km`
    );

    const gravityParagraph = screen.getByText('Gravity:', {
      selector: 'span',
    }).parentElement;
    expect(gravityParagraph).toHaveTextContent(`Gravity: ${props.gravity}`);
  });
});
