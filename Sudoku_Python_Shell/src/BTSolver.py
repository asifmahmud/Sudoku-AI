import SudokuBoard
import Variable
import Domain
import Trail
import Constraint
import ConstraintNetwork
import time

class BTSolver:

    # ==================================================================
    # Constructors
    # ==================================================================

    def __init__ ( self, gb, trail, val_sh, var_sh, cc ):
        self.network = ConstraintNetwork.ConstraintNetwork(gb)
        self.hassolution = False
        self.gameboard = gb
        self.trail = trail

        self.varHeuristics = var_sh
        self.valHeuristics = val_sh
        self.cChecks = cc

    # ==================================================================
    # Consistency Checks
    # ==================================================================

    # Basic consistency check, no propagation done
    def assignmentsCheck ( self ):
        for c in self.network.getConstraints():
            if not c.isConsistent():
                return False
        return True

    """
        Part 1 TODO: Implement the Forward Checking Heuristic

        This function will do both Constraint Propagation and check
        the consistency of the network

        (1) If a variable is assigned then eliminate that value from
            the square's neighbors.

        Note: remember to trail.push variables before you change their domain
        Return: true is assignment is consistent, false otherwise
    """
    def forwardChecking ( self ):
        # Propagate the constraint
        for v in self.network.variables:
            if (v.domain.isEmpty()):
                return False
            if v.isAssigned():
                for n in self.network.getNeighborsOfVariable(v):
                    if (v.getAssignment() in n.getValues()):
                        if (n.isAssigned()):
                            return False
                        self.trail.push(n)
                        n.removeValueFromDomain(v.getAssignment())

        # Check consistency of the network
        for c in self.network.getModifiedConstraints():
            if not c.isConsistent():
                return False
        
        return True

    """
        Part 2 TODO: Implement both of Norvig's Heuristics

        This function will do both Constraint Propagation and check
        the consistency of the network

        (1) If a variable is assigned then eliminate that value from
            the square's neighbors.

        (2) If a constraint has only one possible place for a value
            then put the value there.

        Note: remember to trail.push variables before you change their domain
        Return: true is assignment is consistent, false otherwise
    """

    def norvigCheck( self ):
        # (1) If a variable is assigned, eliminate that variable from the square's neighbors 
        status = self.forwardChecking()
        if not status: return status
        
        # (2) If a constraint has only one possible place for a value then put the value there.
        candidates = [v for v in self.network.variables if v.size() == 1]
        for v in candidates:
            val = v.getValues()[0]
            v.assignValue(val)
            for n in self.network.getNeighborsOfVariable(v):
                if val in n.getValues():
                    if n.isAssigned(): return False
                    self.trail.push(n)
                    n.removeValueFromDomain(val)

        # Check consistency of the network
        for c in self.network.getModifiedConstraints():
            if not c.isConsistent():
                return False

        return True
            

    """
         Optional TODO: Implement your own advanced Constraint Propagation

         Completing the three tourn heuristic will automatically enter
         your program into a tournament.
     """
    def getTournCC ( self ):
        queue = [(x, y) for x in self.network.variables for y in self.network.getNeighborsOfVariable(x)]
        while queue:
            (x, y) = queue.pop()
            if self.needToRevise(x, y):
                if not x.getValues(): return False
                for a in self.network.getNeighborsOfVariable(x):
                    if a != x: queue.append((a, x))
        return True

    def needToRevise(self, x, y):
        revised = False
        for a in x.getValues()[:]:
            if self.every(lambda q: not self.constraints(a, q), y.getValues()):
                self.trail.push(x)
                x.removeValueFromDomain(a)
                revised = True
        return revised

    def every(self, pred, seq):
        for x in seq:
            if not pred(x): return False
        return True

    def constraints(self, a, b):
        return a != b

    # ==================================================================
    # Variable Selectors
    # ==================================================================

    # Basic variable selector, returns first unassigned variable
    def getfirstUnassignedVariable ( self ):
        for v in self.network.variables:
            if not v.isAssigned():
                return v

        # Everything is assigned
        return None

    """
        Part 1 TODO: Implement the Minimum Remaining Value Heuristic

        Return: The unassigned variable with the smallest domain
    """
    def getMRV ( self ):
        mrv = None
        mini = float("inf") 
        for v in self.network.variables:
            if (not v.isAssigned()) and (v.domain.size() < mini):
                mrv = v
                mini = v.domain.size()
        return mrv


    """
        Part 2 TODO: Implement the Degree Heuristic

        Return: The unassigned variable with the most unassigned neighbors
    """
    def getDegree ( self ):
        unassigned = [v for v in self.network.variables if not v.isAssigned()]
        result = sorted(unassigned, key=lambda x: self.__MADKey(x), reverse=True)
        return result.pop() if len(result) > 0 else None


    """
        Part 2 TODO: Implement the Minimum Remaining Value Heuristic
                       with Degree Heuristic as a Tie Breaker

        Return: The unassigned variable with, first, the smallest domain
                and, second, the most unassigned neighbors
    """
    def MRVwithTieBreaker ( self ):
        mini = float("inf")
        minVariables = [] 
        for v in self.network.variables:
            if not v.isAssigned():
                if v.domain.size() < mini:
                    minVariables = [v]
                    mini = v.domain.size()
                elif v.domain.size() == mini:
                    minVariables.append(v)

        if   len(minVariables)  == 0: return None
        elif len(minVariables)  == 1: return minVariables.pop()
        else:
            minVariables = sorted(minVariables, key=lambda x: self.__MADKey(x), reverse=True)
            return minVariables.pop()


    def __MADKey(self, x):
        count = 0
        for n in self.network.getNeighborsOfVariable(x):
            if (not n.isAssigned()): count += 1
        return count


    """
         Optional TODO: Implement your own advanced Variable Heuristic

         Completing the three tourn heuristic will automatically enter
         your program into a tournament.
    """
    def getTournVar ( self ):
        mini = float("inf")
        minVariables = [] 
        for v in self.network.variables:
            if not v.isAssigned():
                if v.domain.size() < mini:
                    minVariables = [v]
                    mini = v.domain.size()
                elif v.domain.size() == mini:
                    minVariables.append(v)

        if   len(minVariables)  == 0: return None
        elif len(minVariables)  == 1: return minVariables.pop()
        else:
            minVariables = sorted(minVariables, key=lambda x: self.__MADKey(x), reverse=True)
            return minVariables.pop()

    # ==================================================================
    # Value Selectors
    # ==================================================================

    # Default Value Ordering
    def getValuesInOrder ( self, v ):
        values = v.domain.values
        return sorted( values )

    """
        Part 1 TODO: Implement the Least Constraining Value Heuristic

        The Least constraining value is the one that will knock the least
        values out of it's neighbors domain.

        Return: A list of v's domain sorted by the LCV heuristic
                The LCV is first and the MCV is last
    """

    def __sortKey(self, value, v):
        domainSize = 0
        for var in self.network.getNeighborsOfVariable(v):
            domainSize += var.size()-1 if value in var.getValues() else var.size()
        return domainSize


    def getValuesLCVOrder ( self, v ):
        return sorted(v.domain.values, key=lambda i: self.__sortKey(i,v), reverse=True)

    """
         Optional TODO: Implement your own advanced Value Heuristic

         Completing the three tourn heuristic will automatically enter
         your program into a tournament.
     """

    def getTournVal ( self, v ):
        return sorted(v.domain.values, key=lambda i: self.__sortKey(i,v), reverse=True)

    # ==================================================================
    # Engine Functions
    # ==================================================================

    def solve ( self ):
        if self.hassolution:
            return

        # Variable Selection
        v = self.selectNextVariable()

        # check if the assigment is complete
        if ( v == None ):
            for var in self.network.variables:

                # If all variables haven't been assigned
                if not var.isAssigned():
                    print ( "Error" )

            # Success
            self.hassolution = True
            return

        # Attempt to assign a value
        for i in self.getNextValues( v ):

            # Store place in trail and push variable's state on trail
            self.trail.placeTrailMarker()
            self.trail.push( v )

            # Assign the value
            v.assignValue( i )

            # Propagate constraints, check consistency, recurse
            if self.checkConsistency():
                self.solve()

            # If this assignment succeeded, return
            if self.hassolution:
                return

            # Otherwise backtrack
            self.trail.undo()

    def checkConsistency ( self ):
        if self.cChecks == "forwardChecking":
            return self.forwardChecking()

        if self.cChecks == "norvigCheck":
            return self.norvigCheck()

        if self.cChecks == "tournCC":
            return self.getTournCC()

        else:
            return self.assignmentsCheck()

    def selectNextVariable ( self ):
        if self.varHeuristics == "MinimumRemainingValue":
            return self.getMRV()

        if self.varHeuristics == "Degree":
            return self.getDegree()

        if self.varHeuristics == "MRVwithTieBreaker":
            return self.MRVwithTieBreaker()

        if self.varHeuristics == "tournVar":
            return self.getTournVar()

        else:
            return self.getfirstUnassignedVariable()

    def getNextValues ( self, v ):
        if self.valHeuristics == "LeastConstrainingValue":
            return self.getValuesLCVOrder( v )

        if self.valHeuristics == "tournVal":
            return self.getTournVal( v )

        else:
            return self.getValuesInOrder( v )

    def getSolution ( self ):
        return self.network.toSudokuBoard(self.gameboard.p, self.gameboard.q)