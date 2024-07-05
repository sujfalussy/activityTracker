(function() {
    // Check if the current page is the specified URL
    var targetPageUrl = "https://z3n-finservhelp.zendesk.com/hc/en-gb/categories/12057576841629-Opening-an-account";
    if (window.location.href === targetPageUrl) {
        // Make an API request to get the Zendesk user ID based on the logged-in email address
        fetch('/api/v2/users/me.json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic c3VqZmFsdXNzeUB6ZW5kZXNrLmNvbS90b2tlbjpSYzZESzJsQVRlQW1ac0YwTWV3OWF1MkxsTUdjYTBwQVdVSlB5azA1' // Replace with your actual API token
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.user && data.user.id) {
                var userId = data.user.id;
                // Create the event data
                var eventData = {
                    event: {
                        type: "custom",
                        source: "front end activity",
                        description: "User visited the Opening an account page",
                        properties: {
                            url: window.location.href
                        }
                    }
                };
                // Post the custom event to Zendesk
                fetch(`/api/v2/users/${userId}/events`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer YOUR_API_TOKEN' // Replace with your actual API token
                    },
                    body: JSON.stringify(eventData)
                })
                .then(response => {
                    if (response.ok) {
                        console.log('Event posted successfully');
                    } else {
                        console.error('Failed to post event');
                    }
                })
                .catch(error => console.error('Error:', error));
            } else {
                console.error('User ID not found');
            }
        })
        .catch(error => console.error('Error:', error));
    }
})();
