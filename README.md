# **Basic Scrumboard created with JavaScript and React**

## **About the project** 
Think of this as a scrumboard for a smaller company/small task force where everyone has privileges to add tasks, assign tasks and to get it done but only admin/bosses has the right to approve if done or not. 

If a task is rejected it will fall back in to "In Progress" with comments on what's missing, seen in bright red text. 

The scrumboard has a fake login, when you open the page you are already "logged in". There you can choose to view the board as admin or user. 
If you are a user you can view all assignments, add new ones, assign them to whoever gets the honor. But as said before, only those with REAL power can approve/reject the tasks. 

To change between user/admin, click the button in the lower left corner. 

## **Design**
Design is inspired by real life scrumboards, old school with post-it notes on a wall. Could of course used a more readable font but liked this one. Took a decision and I stand by it. 


## **Upcoming features**
- Drag and drop functionality. You will be able to change the order on the different columns, arrange according to priority AND drag/drop between columns as well. However you wish. Preferably drag and drop between columns when using tablets/cellphones, otherwise as it works now to make sure all is correct. 
- See who assigned what to who, better follow up if there are mistakes. Who assigned what and why, follow up in every step.
- Another category in the database, save all assignments that has been approved, to better understand how it all works. For now they all disappear. Could just add them to a new category, instead of assignments put them under archive with their whole history och who did what.
- Timestamps, keep track on how long every assignment takes, see where we as a company can increase productivity. Click pause on assignments for breaks, make sure all is logged to make it all right, know exactly what we do when and why. No pressure at all. Just have fun

##**Get started**
Using VS code, these steps are necessary
npm i
npm run dev

Or just go by Github pages and go crazzzy
