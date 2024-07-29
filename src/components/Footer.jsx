// Footer component for footer section
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer">
      Created By
      <i className="fa-solid fa-heart"></i>
      <a
        href="https://www.linkedin.com/in/rohit-sharma108/"
        target="_blank"
        title="Rohit Kumar's Linkedin Profile"
      >
        Rohit Kumar
      </a>
      <i className="fa-solid fa-copyright"></i>
      {year}
      <a
        href="https://github.com/Rohit-108/food-app"
        target="_blank"
        title="Food Villa Github Repository"
      >
        <strong>
          Food<span>Villa</span>
        </strong>
      </a>
    </div>
  );
};

export default Footer;
