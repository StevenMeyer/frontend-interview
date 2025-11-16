<!-- Project Comments Go Here -->
With more time I would have liked to have examined the response from the API to pick out the x-total-count header and the references to the total pages from the Link header to show, either above or below the table, text similar to "Showing N of T applications".

To develop that idea further I would also only show one page at a time and use the same data to show "Showing page N of M", rather than a long list of applications.

I started using these headers in the unit test for the service, but quickly realised I did not have the time to implement that data in the service.
