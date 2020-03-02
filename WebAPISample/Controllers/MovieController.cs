using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPISample.Data;
using WebAPISample.Models;

namespace WebAPISample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private ApplicationContext _context;
        public MovieController(ApplicationContext context)
        {
            _context = context;
        }
        // GET: api/Movie
        [HttpGet]
        public IEnumerable<string> Get()
        {
            // Retrieve all movies from db logic
            var movies = _context.Movies.Select(m => m.Title).ToList();
            return movies;
        }

        // GET: api/Movie/5
        [HttpGet("{id}", Name = "Get")]
        public Movie Get(int id)
        {
            // Retrieve movie by id from db logic
            Movie selectedMovie = _context.Movies.Find(id);
            return selectedMovie;
        }

        // POST: api/Movie
        [HttpPost]
        public void Post([FromBody] Movie movie)
        {
            // Create movie in db logic
            if(ModelState.IsValid)
            {
                _context.Add(movie);
                _context.SaveChanges();
            }
        }

        // PUT: api/Movie/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
            // Update movie in db logic

        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id, Movie movie)
        {
            if(ModelState.IsValid)
            {
                _context.Movies.Remove(movie);
                _context.SaveChanges();
            }
            else
            {
                Delete(id, movie);
            }
        }
    }
}
