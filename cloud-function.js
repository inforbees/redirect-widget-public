const redirectToURL = async (req, res) => {
    // List of allowed origins
    const allowedOrigins = [
      "http://inforbees.com",
      "https://inforbees.com",
      "http://www.inforbees.com",
      "https://www.inforbees.com",
      "www.inforbees.com",
      "inforbees.com",
      "http://inforbees.com/",
      "https://inforbees.com/",
      "http://www.inforbees.com/",
      "https://www.inforbees.com/",
      "www.inforbees.com/",
      "inforbees.com/"
    ];
  
    // Get the request origin
    const requestOrigin = req.get('origin');
  
    // Check if the request origin is in the list of allowed origins
    if (allowedOrigins.includes(requestOrigin)) {
      // Allow the request
      res.set('Access-Control-Allow-Origin', requestOrigin);
      res.set('Access-Control-Allow-Methods', 'GET');
    } else {
      // Disallow the request
      res.status(403).send('Invalid request');
      return;
    }
  
    // Get the ID parameter from the request
    const id = req.query.id;
  
    // Check if the ID is present
    if (!id) {
      res.status(400).send('ID parameter is missing.');
      return;
    }
  
    try {
      // Fetch JSON from the specified URL
      const response = await fetch('https://storage.googleapis.com/****confidential****/****confidential****');
  
      if (!response.ok) {
        console.error('Error fetching JSON:', response.statusText);
        res.status(response.status).send(response.statusText);
        return;
      }
  
      // Parse the JSON response
      const idMapping = await response.json();
  
      // Check if the ID is in the mapping
      const url = idMapping[id];
      if (url) {
        // Send the target URL to the client
        res.status(200).json({ redirectTo: url });
      } else {
        // ID not found, return an error
        res.status(404).send('ID not found.');
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error.');
    }
  };
  
  // Export the function
  exports.redirectToURL = redirectToURL;