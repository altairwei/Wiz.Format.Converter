#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <vector>
#include <string>
#include <iostream>

using std::cin;
using std::cout;
using std::endl;
using std::string;
using std::vector;

using namespace std;

int main( int argc, char *argv[], char *envp[] )
{  
    int count;

    // Display each command-line argument.  
    cout << "\nCommand-line arguments:\n";  
    for( count = 0; count < argc; count++ )  
    {
      cout << "  argv[" << count << "]   "  
            << argv[count] << "\n";  
    }

}  