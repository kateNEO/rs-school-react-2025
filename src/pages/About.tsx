function About() {
  return (
    <div>
      <h2 className="text-2xl text-black text-center">ABOUT</h2>
      <p className="text-ml text-black px-5 font-light tracking-wide text-justify mt-10">
        This project was developed as part of the React 2025 course at{' '}
        <a href="https://rs.school/" className="font-bold border-b-1">
          {' '}
          Rolling Scope School
        </a>
        .
      </p>
      <p className="text-ml text-black px-5 font-extralight tracking-wide text-justify">
        My name is Ekaterina Naumenko and I&apos;m junior developer with a keen
        eye for detail and a strong desire to grow through hands-on practice. I
        believe that the path to mastery begins with perseverance and patience.
      </p>
      <p className="font-extralight text-center py-2">
        <b>GitHub: </b>
        <a href="https://github.com/kateNEO" className="border-b-1">
          {' '}
          kateNEO
        </a>
      </p>
    </div>
  );
}

export default About;
